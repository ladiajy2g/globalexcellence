<?php
/**
 * Global Excellence - Advert System Setup
 * Add this code to your theme's functions.php or a custom plugin
 */

// 1. Register 'advert' Custom Post Type
function ge_register_advert_post_type() {
    $labels = array(
        'name'               => 'Adverts',
        'singular_name'      => 'Advert',
        'menu_name'          => 'Adverts',
        'name_admin_bar'     => 'Advert',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Advert',
        'edit_item'          => 'Edit Advert',
        'new_item'           => 'New Advert',
        'view_item'          => 'View Advert',
        'search_items'       => 'Search Adverts',
        'not_found'          => 'No adverts found',
        'not_found_in_trash' => 'No adverts found in trash',
    );

    $args = array(
        'label'              => 'Adverts',
        'description'        => 'Advertisement posts for site placements',
        'labels'             => $labels,
        'supports'           => array('title', 'thumbnail', 'revisions'),
        'public'             => true,
        'show_in_menu'       => true,
        'menu_position'      => 50,
        'menu_icon'          => 'dashicons-megaphone',
        'has_archive'        => false,
        'show_in_rest'       => true, // Enable Gutenberg/Rest API
        'rewrite'            => array('slug' => 'adverts'),
    );

    register_post_type('advert', $args);
}
add_action('init', 'ge_register_advert_post_type');

// 2. Register 'ad_placements' Taxonomy
function ge_register_ad_placements_taxonomy() {
    $labels = array(
        'name'              => 'Ad Placements',
        'singular_name'     => 'Ad Placement',
        'menu_name'         => 'Placements',
        'search_items'      => 'Search Placements',
        'all_items'         => 'All Placements',
        'edit_item'         => 'Edit Placement',
        'update_item'       => 'Update Placement',
        'add_new_item'      => 'Add New Placement',
    );

    $args = array(
        'labels'            => $labels,
        'hierarchical'      => false,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'show_in_rest'      => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'ad-placements'),
    );

    register_taxonomy('ad_placements', array('advert'), $args);
}
add_action('init', 'ge_register_ad_placements_taxonomy');

// 3. Register Custom Meta Boxes for Ad Fields
function ge_add_advert_meta_boxes() {
    add_meta_box(
        'ge_advert_details',
        'Advert Details',
        'ge_advert_meta_box_callback',
        'advert',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'ge_add_advert_meta_boxes');

function ge_advert_meta_box_callback($post) {
    $ad_link = get_post_meta($post->ID, 'ad_link', true);
    $ad_video_url = get_post_meta($post->ID, 'ad_video_url', true);
    
    wp_nonce_field('ge_save_advert_meta', 'ge_advert_meta_nonce');
    ?>
    <table class="form-table">
        <tr>
            <th scope="row">
                <label for="ad_link"><?php _e('Ad Link (Click-through URL)', 'ge-text'); ?></label>
            </th>
            <td>
                <input type="url" id="ad_link" name="ad_link" value="<?php echo esc_url($ad_link); ?>" class="large-text" placeholder="https://example.com" />
                <p class="description"><?php _e('The URL users will be directed to when clicking the ad.', 'ge-text'); ?></p>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="ad_video_url"><?php _e('Video URL (YouTube)', 'ge-text'); ?></label>
            </th>
            <td>
                <input type="url" id="ad_video_url" name="ad_video_url" value="<?php echo esc_url($ad_video_url); ?>" class="large-text" placeholder="https://youtube.com/watch?v=..." />
                <p class="description"><?php _e('Optional: Enter YouTube URL to display video instead of image.', 'ge-text'); ?></p>
            </td>
        </tr>
    </table>
    <?php
}

// 4. Save Meta Box Data
function ge_save_advert_meta($post_id) {
    if (!isset($_POST['ge_advert_meta_nonce'])) return;
    if (!wp_verify_nonce($_POST['ge_advert_meta_nonce'], 'ge_save_advert_meta')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['ad_link'])) {
        update_post_meta($post_id, 'ad_link', esc_url_raw($_POST['ad_link']));
    }
    if (isset($_POST['ad_video_url'])) {
        update_post_meta($post_id, 'ad_video_url', esc_url_raw($_POST['ad_video_url']));
    }
}
add_action('save_post', 'ge_save_advert_meta');

// 5. Expose Custom Fields to WPGraphQL
function ge_register_graphql_advert_fields() {
    // Expose ad_link field
    register_graphql_field('Advert', 'adLink', array(
        'type' => 'String',
        'description' => 'The click-through URL for the advert',
        'resolve' => function($post) {
            return get_post_meta($post->ID, 'ad_link', true);
        }
    ));

    // Expose ad_video_url field
    register_graphql_field('Advert', 'adVideoUrl', array(
        'type' => 'String',
        'description' => 'The YouTube video URL for the advert',
        'resolve' => function($post) {
            return get_post_meta($post->ID, 'ad_video_url', true);
        }
    ));

    // Expose ad_placements as a connection
    register_graphql_connection(array(
        'fromType' => 'Advert',
        'toType' => 'Term',
        'fromFieldName' => 'adPlacements',
        'resolver' => function($source, $args, $context, $info) {
            $terms = get_the_terms($source->ID, 'ad_placements');
            if (empty($terms)) return null;
            
            $resolver = new WPGraphQL\Data\TermObjectConnectionResolver($source, $args, $context, $info, 'ad_placements');
            return $resolver->get_connection();
        }
    ));
}
add_action('graphql_register_types', 'ge_register_graphql_advert_fields');

// 6. Flush Rewrite Rules on Theme Activation
function ge_flush_rewrite_on_activation() {
    ge_register_advert_post_type();
    ge_register_ad_placements_taxonomy();
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'ge_flush_rewrite_on_activation');