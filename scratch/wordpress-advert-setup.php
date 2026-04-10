<?php
/**
 * Global Excellence - Custom Advertisement System
 * Registers 'advert' CPT, 'ad_placements' taxonomy, and custom meta fields for WPGraphQL.
 */

// Wrap in condition to prevent conflicts
if (!function_exists('daylight_register_advert_post_type')) {

    // 1. Register Taxonomy & Post Type
    add_action('init', function() {
        // Ad Placements Taxonomy
        register_taxonomy('ad_placements', 'advert', [
            'labels' => [
                'name'          => 'Ad Placements',
                'singular_name' => 'Ad Placement',
                'menu_name'     => 'Placements',
            ],
            'hierarchical'        => true,
            'show_ui'             => true,
            'show_admin_column'   => true,
            // Keep REST true for taxonomy so you can select placements in the sidebar
            'show_in_rest'        => true, 
            'show_in_graphql'     => true,
            'graphql_single_name' => 'adPlacement',
            'graphql_plural_name' => 'adPlacements',
        ]);

        // Advert Custom Post Type
        register_post_type('advert', [
            'labels' => [
                'name'          => 'Adverts',
                'singular_name' => 'Advert',
                'add_new'       => 'Add New Advert',
                'edit_item'     => 'Edit Advert',
                'menu_name'     => 'Adverts',
            ],
            'public'              => true,
            'has_archive'         => false,
            'menu_icon'           => 'dashicons-megaphone',
            'supports'            => ['title', 'thumbnail'],
            // CRITICAL FIX: Disabling REST forces WordPress to use the Classic Editor for Adverts.
            // This guarantees the input text boxes will be fully visible and clickable without Gutenberg blocking them.
            'show_in_rest'        => false, 
            'show_in_graphql'     => true,
            'graphql_single_name' => 'advert',
            'graphql_plural_name' => 'adverts',
            'taxonomies'          => ['ad_placements'],
        ]);
    });

    // 2. Add Meta Boxes below the Editor
    add_action('add_meta_boxes', function() {
        add_meta_box(
            'daylight_banner_url_settings',
            'Advert Link & Video Settings',
            function($post) {
                wp_nonce_field('save_banner_data', 'banner_meta_nonce');
                
                // Retrieve current values (changed meta keys to avoid AdBlockers)
                $promo_link = get_post_meta($post->ID, 'promo_target_url', true);
                $promo_video = get_post_meta($post->ID, 'promo_video_url', true);
                ?>
                <div style="padding: 15px 10px; background: #fff; border-left: 4px solid #0073aa;">
                    <p>
                        <label for="promo_target_url" style="font-weight:bold; font-size:14px; display:block; margin-bottom:10px;">Advert Link (Click-through URL):</label>
                        <input type="text" id="promo_target_url" name="promo_target_url" value="<?php echo esc_attr($promo_link); ?>" class="large-text" placeholder="https://example.com" style="width: 100%; max-width: 600px; padding:10px; font-size: 14px; border: 1px solid #8c8f94; border-radius: 4px;">
                        <br><span class="description" style="display:inline-block; margin-top:5px; color:#666;">Enter the website link here. When visitors click the advert image, it will open this link.</span>
                    </p>
                    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
                    <p>
                        <label for="promo_video_url" style="font-weight:bold; font-size:14px; display:block; margin-bottom:10px;">Video URL (YouTube - Optional):</label>
                        <input type="text" id="promo_video_url" name="promo_video_url" value="<?php echo esc_attr($promo_video); ?>" class="large-text" placeholder="https://www.youtube.com/watch?v=..." style="width: 100%; max-width: 600px; padding:10px; font-size: 14px; border: 1px solid #8c8f94; border-radius: 4px;">
                        <br><span class="description" style="display:inline-block; margin-top:5px; color:#666;">If you enter a YouTube link here, the advert will show as a video instead of an image.</span>
                    </p>
                </div>
                <?php
            },
            'advert',
            'normal',
            'high'
        );
    });

    // 3. Save the Data when the Advert is saved or updated
    add_action('save_post_advert', function($post_id) {
        if (!isset($_POST['banner_meta_nonce']) || !wp_verify_nonce($_POST['banner_meta_nonce'], 'save_banner_data')) return;
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (!current_user_can('edit_post', $post_id)) return;

        if (isset($_POST['promo_target_url'])) {
            update_post_meta($post_id, 'promo_target_url', esc_url_raw($_POST['promo_target_url']));
        }
        if (isset($_POST['promo_video_url'])) {
            update_post_meta($post_id, 'promo_video_url', esc_url_raw($_POST['promo_video_url']));
        }
    });

    // 4. Create default ad placements on load
    add_action('init', function() {
        $placements = [
            'top-banner'       => 'Top Banner',
            'footer-banner'    => 'Footer Banner',
            'hero-bottom'      => 'Hero Bottom',
            'between-sections' => 'Between Sections',
            'home-grid'        => 'Home Grid',
            'article-sidebar'  => 'Article Sidebar',
        ];
        foreach ($placements as $slug => $name) {
            if (!term_exists($slug, 'ad_placements')) {
                wp_insert_term($name, 'ad_placements', ['slug' => $slug]);
            }
        }
    });

    // 5. Register the fields in WPGraphQL for the Frontend
    add_action('graphql_register_types', function() {
        if (!function_exists('register_graphql_field')) return;

        register_graphql_field('Advert', 'adLink', [
            'type'        => 'String',
            'description' => 'The destination URL when the ad is clicked',
            'resolve'     => function($post) {
                // Return the new safe key name, checking old key for backwards compatibility
                $link = get_post_meta($post->databaseId, 'promo_target_url', true);
                if (!$link) $link = get_post_meta($post->databaseId, 'ad_link', true);
                return $link;
            }
        ]);

        register_graphql_field('Advert', 'adVideoUrl', [
            'type'        => 'String',
            'description' => 'The YouTube video URL for video ads',
            'resolve'     => function($post) {
                $video = get_post_meta($post->databaseId, 'promo_video_url', true);
                if (!$video) $video = get_post_meta($post->databaseId, 'ad_video_url', true);
                return $video;
            }
        ]);
    });
}