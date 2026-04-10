<?php
/**
 * Daylight NG - WordPress Setup Instructions
 * 
 * STEP 1: Add this code to your WordPress theme's functions.php or create a custom plugin
 * STEP 2: Enable 'advert' and 'ad_placements' in WPGraphQL settings (Settings > GraphQL > Enabled Taxonomies/Post Types)
 * STEP 3: Create your adverts in WordPress admin with featured images and placement assignments
 * STEP 4: Update the wp-api.js to remove the bypass (see scratch/update-wp-api.txt)
 */

// Wrap in condition to prevent conflicts
if (!function_exists('daylight_register_advert_post_type')) {

    // 1. Register Custom Post Type: Advert
    function daylight_register_advert_post_type() {
        $labels = array(
            'name'               => 'Adverts',
            'singular_name'      => 'Advert',
            'menu_name'          => 'Adverts',
            'add_new'            => 'Add New Advert',
            'add_new_item'       => 'Add New Advert',
            'edit_item'          => 'Edit Advert',
            'new_item'           => 'New Advert',
            'view_item'          => 'View Advert',
            'search_items'       => 'Search Adverts',
            'not_found'          => 'No adverts found',
            'not_found_in_trash' => 'No adverts found in trash',
        );

        $args = array(
            'label'               => 'Adverts',
            'description'         => 'Advertisement banners and videos',
            'labels'              => $labels,
            'supports'            => array('title', 'thumbnail'),
            'taxonomies'          => array('ad_placements'),
            'public'              => true,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'menu_position'       => 50,
            'menu_icon'           => 'dashicons-megaphone',
            'has_archive'        => false,
            'exclude_from_search' => true,
            'publicly_queryable'  => true,
            'show_in_rest'        => true,
            'show_in_graphql'     => true,
            'graphql_single_name' => 'advert',
            'graphql_plural_name' => 'adverts',
        );

        register_post_type('advert', $args);
    }
    add_action('init', 'daylight_register_advert_post_type');

    // 2. Register Taxonomy: Ad Placements
    function daylight_register_ad_placements_taxonomy() {
        $labels = array(
            'name'              => 'Ad Placements',
            'singular_name'     => 'Ad Placement',
            'search_items'      => 'Search Placements',
            'all_items'         => 'All Placements',
            'edit_item'         => 'Edit Placement',
            'update_item'       => 'Update Placement',
            'add_new_item'      => 'Add New Placement',
            'new_item_name'     => 'New Placement Name',
            'menu_name'         => 'Placements',
        );

        $args = array(
            'labels'            => $labels,
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array('slug' => 'ad-placements'),
            'show_in_rest'      => true,
            'show_in_graphql'     => true,
            'graphql_single_name' => 'adPlacement',
            'graphql_plural_name' => 'adPlacements',
        );

        register_taxonomy('ad_placements', array('advert'), $args);
    }
    add_action('init', 'daylight_register_ad_placements_taxonomy');

    // 3. Add Meta Boxes for Ad Custom Fields
    function daylight_add_advert_meta_boxes() {
        add_meta_box(
            'daylight_advert_details',
            'Advert Details',
            'daylight_advert_meta_box_callback',
            'advert',
            'normal',
            'high'
        );
    }
    add_action('add_meta_boxes', 'daylight_add_advert_meta_boxes');

    function daylight_advert_meta_box_callback($post) {
        $ad_link = get_post_meta($post->ID, 'adLink', true);
        $ad_video_url = get_post_meta($post->ID, 'adVideoUrl', true);
        ?>
        <table style="width: 100%;">
            <tr>
                <td style="width: 150px; padding: 10px 0;">
                    <label for="adLink" style="font-weight: bold;">Advert Link (URL):</label>
                </td>
                <td>
                    <input type="url" id="adLink" name="adLink" 
                           value="<?php echo esc_attr($ad_link); ?>" 
                           style="width: 100%; padding: 8px;" 
                           placeholder="https://example.com">
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 0;">
                    <label for="adVideoUrl" style="font-weight: bold;">Video URL (YouTube):</label>
                </td>
                <td>
                    <input type="url" id="adVideoUrl" name="adVideoUrl" 
                           value="<?php echo esc_attr($ad_video_url); ?>" 
                           style="width: 100%; padding: 8px;" 
                           placeholder="https://youtube.com/watch?v=...">
                </td>
            </tr>
        </table>
        <?php
    }

    // 4. Save Meta Box Data
    function daylight_save_advert_meta($post_id) {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (!current_user_can('edit_post', $post_id)) return;
        
        if (isset($_POST['adLink'])) {
            update_post_meta($post_id, 'adLink', sanitize_url($_POST['adLink']));
        }
        if (isset($_POST['adVideoUrl'])) {
            update_post_meta($post_id, 'adVideoUrl', sanitize_url($_POST['adVideoUrl']));
        }
    }
    add_action('save_post', 'daylight_save_advert_meta');

    // 5. Create default ad placements
    function daylight_create_default_ad_placements() {
        $placements = array(
            'top-banner'       => 'Top Banner',
            'footer-banner'    => 'Footer Banner',
            'hero-bottom'      => 'Hero Bottom',
            'between-sections' => 'Between Sections',
            'home-grid'        => 'Home Grid',
            'article-sidebar' => 'Article Sidebar',
        );

        foreach ($placements as $slug => $name) {
            if (!term_exists($slug, 'ad_placements')) {
                wp_insert_term($name, 'ad_placements', array('slug' => $slug));
            }
        }
    }
    add_action('init', 'daylight_create_default_ad_placements');

    // 6. Register custom meta fields for WPGraphQL
    function daylight_register_advert_meta() {
        register_post_meta('advert', 'adLink', array(
            'type'         => 'string',
            'single'       => true,
            'show_in_rest' => true,
            'show_in_graphql' => true,
        ));
        register_post_meta('advert', 'adVideoUrl', array(
            'type'         => 'string',
            'single'       => true,
            'show_in_rest' => true,
            'show_in_graphql' => true,
        ));

        // Explicitly register fields for WPGraphQL for easier access
        if (function_exists('register_graphql_field')) {
            register_graphql_field('advert', 'adLink', array(
                'type'        => 'String',
                'description' => 'The destination URL for the advert',
                'resolve'     => function($post) {
                    return get_post_meta($post->ID, 'adLink', true);
                }
            ));
            register_graphql_field('advert', 'adVideoUrl', array(
                'type'        => 'String',
                'description' => 'The YouTube URL for the advert',
                'resolve'     => function($post) {
                    return get_post_meta($post->ID, 'adVideoUrl', true);
                }
            ));
        }
    }
    add_action('init', 'daylight_register_advert_meta');
}