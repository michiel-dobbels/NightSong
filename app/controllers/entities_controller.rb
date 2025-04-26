class EntitiesController < ApplicationController
    before_action :set_entity, only: [:show]
  
    def index
      @entities = Entity.all
    end
  
    def new
      @entity = Entity.new
    end
  
    def create
      @entity = Entity.new(entity_params)
      if @entity.save
        redirect_to @entity, notice: 'Entity was successfully created.'
      else
        render :new
      end
    end
  
    def show
      @entity = Entity.find(params[:id])
      @rating = current_user&.ratings&.find_or_initialize_by(entity: @entity)
    
      @average_rating = @entity.ratings.average(:stars)&.to_f || 0.0
      @rating_distribution = (1..5).map { |i| [i, @entity.ratings.where(stars: i).count] }.to_h
      @news_posts = Post.where("LOWER(content) LIKE ?", "%#{@entity.full_name.downcase}%")
    
      @media_posts = @news_posts.select do |post|
        post.image.attached? || post.video.attached? ||
        post.content.match?(%r{https?://(www\.)?(youtube\.com|youtu\.be)})
      end
    end
    
    
    
    
  
    private
  
    def set_entity
      @entity = Entity.find(params[:id])
      @rating = @entity.ratings.find_or_initialize_by(user: current_user)
    end
  
    def entity_params
      params.require(:entity).permit(:full_name, :profile_image, :cover_photo)
    end

    
      
      
  end
  