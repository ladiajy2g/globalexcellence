<?php
/* Plugin Name: GE Advert System - Simple & Working */

// 1. Register Advert Custom Post Type
function ge_register_advert_post_type() {
    $args = array(
        'label' => __( 'Adverts' ),
        'public' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-megaphone',
        'supports' => array( 'title', 'thumbnail' ),
        'show_in_rest' => true,
    );
    register_post_type( 'advert', $args );
}
add_action( 'init', 'ge_register_advert_post_type' );

// 2. Register Ad Placements Taxonomy
function ge_register_ad_placements_taxonomy() {
    $args = array(
        'label' => __( 'Ad Placements' ),
        'show_in_menu' => true,
        'show_in_rest' => true,
    );
    register_taxonomy( 'ad_placements', 'advert', $args );
}
add_action( 'init', 'ge_register_ad_placements_taxonomy' );

// 3. METABOX: Advert Link URL
function ge_add_advert_link_meta_box() {
    add_meta_box( 
        'ge_advert_link', 
        __( 'Advert Link URL' ), 
        'ge_advert_link_meta_box_html', 
        'advert', 
        'normal', 
        'high' 
    );
}
add_action( 'add_meta_boxes', 'ge_add_advert_link_meta_box' );

function ge_advert_link_meta_box_html( $post ) {
    $value = get_post_meta( $post->ID, '_ad_link', true ); // Using _ad_link as internal meta key
    ?>
    <p>
        <label for="_ad_link" style="display:block; font-weight:bold; margin-bottom:5px;">
            Click-through URL (Where users go when clicking the ad):
        </label>
        <input type="url" id="_ad_link" name="_ad_link" value="<?php echo esc_attr( $value ); ?>" 
               style="width:100%; padding:10px;" 
               placeholder="https://example.com">
        <br>
        <small style="color:#666;">Enter the full URL including https://</small>
    </p>
    <?php
}

// 4. METABOX: Video URL (Optional)
function ge_add_video_url_meta_box() {
    add_meta_box( 
        'ge_advert_video', 
        __( 'Video URL (Optional)' ), 
        'ge_advert_video_meta_box_html', 
        'advert', 
        'normal', 
        'high' 
    );
}
add_action( 'add_meta_boxes', 'ge_add_video_url_meta_box' );

function ge_advert_video_meta_box_html( $post ) {
    $value = get_post_meta( $post->ID, '_ad_video_url', true ); // Using _ad_video_url as internal meta key
    ?>
    <p>
        <label for="_ad_video_url" style="display:block; font-weight:bold; margin-bottom:5px;">
            YouTube Video URL (Optional):
        </label>
        <input type="url" id="_ad_video_url" name="_ad_video_url" value="<?php echo esc_attr( $value ); ?>" 
               style="width:100%; padding:10px;" 
               placeholder="https://youtu.be/xxxxxx">
        <br>
        <small style="color:#666;">Leave blank to show featured image instead of video</small>
    </p>
    <?php
}

// 5. SAVE METADATA
function ge_save_advert_meta( $post_id ) {
    // Stop if doing autosave
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    
    // Save advert link URL
    if ( isset( $_POST['_ad_link'] ) ) {
        update_post_meta( $post_id, '_ad_link', sanitize_text_field( wp_unslash( $_POST['_ad_link'] ) ) );
    } else {
        delete_post_meta( $post_id, '_ad_link' );
    }
    
    // Save video URL
    if ( isset( $_POST['_ad_video_url'] ) ) {
        update_post_meta( $post_id, '_ad_video_url', sanitize_text_field( wp_unslash( $_POST['_ad_video_url'] ) ) );
    } else {
        delete_post_meta( $post_id, '_ad_video_url' );
    }
}
add_action( 'save_post_advert', 'ge_save_advert_meta' );

// 6. EXPOSE TO WPGRAPHQL - Map internal meta keys to GraphQL field names
add_action( 'graphql_register_types', function() {
    // Map internal _ad_link to GraphQL adLink field
    register_graphql_field( 'Advert', 'adLink', array(
        'type' => 'String',
        'description' => __( 'Click-through URL for the advert' ),
        'resolve' => function( $post ) {
            return get_post_meta( $post->ID, '_ad_link', true );
        }
    ) );
    
    // Map internal _ad_video_url to GraphQL adVideoUrl field
    register_graphql_field( 'Advert', 'adVideoUrl', array(
        'type' => 'String',
        'description' => __( 'YouTube video URL for the advert' ),
        'resolve' => function( $post ) {
            return get_post_meta( $post->ID, '_ad_video_url', true );
        }
    ) );
} );