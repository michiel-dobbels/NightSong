require 'action_view'
require 'action_view/helpers'
require 'action_view/helpers/text_helper'
require 'action_view/helpers/url_helper'
require 'action_view/helpers/tag_helper'
require 'action_view/helpers/output_safety_helper'

module ApplicationHelper
  include ActionView::Helpers::TextHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::OutputSafetyHelper
  
  def embed_youtube_links(text)
    youtube_url_regex = %r{(https?://)?(www\.)?(youtube\.com|youtu\.be)/(watch\?v=)?([^\s&]+)}
  
    match = text.match(youtube_url_regex)
    return text unless match
  
    youtube_id = match[5]
  
    if youtube_id
      <<~HTML.html_safe
        <div class="embed-responsive embed-responsive-16by9 has-youtube mb-3">
          <iframe class="embed-responsive-item"
                  src="https://www.youtube.com/embed/#{youtube_id}"
                  frameborder="0"
                  allowfullscreen></iframe>
        </div>
      HTML
    else
      text # fallback: show original text
    end
  end
  
  
  
  
  
  

end
