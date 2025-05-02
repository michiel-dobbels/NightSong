class RatingsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_entity
  
    def create
      @entity = Entity.find(params[:rating][:entity_id])
      @rating = current_user.ratings.find_or_initialize_by(entity: @entity)
    
      @rating.stars = rating_params[:stars]
      @rating.review = rating_params[:review]
    
      if @rating.save
        redirect_to entity_path(@entity), notice: "Rating submitted!"
      else
        redirect_to entity_path(@entity), alert: "There was a problem submitting your rating."
      end
    end
    
    
    
    def update
      @rating = @entity.ratings.find_or_initialize_by(user: current_user)
    
      @rating.stars = rating_params[:stars].to_i
      @rating.review = rating_params[:review]
    
      if @rating.save
        redirect_to entity_path(@entity), notice: "Rating updated!"
      else
        redirect_to entity_path(@entity), alert: "There was a problem updating your rating."
      end
    end
    
    

    
    
  
    private
  
    def set_entity
      @entity = Entity.find(params[:entity_id])
    end
  
    def rating_params
      params.require(:rating).permit(:stars, :review)
    end
  end
  