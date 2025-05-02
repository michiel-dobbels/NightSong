class LikesController < ApplicationController
  before_action :find_likeable

  # app/controllers/likes_controller.rb
  def create
    unless @likeable.likes.exists?(user: current_user)
      @likeable.likes.create(user: current_user)
    end
  
    render json: { like_count: @likeable.likes.count, liked: true }
  end
  
  def destroy
    like = @likeable.likes.find_by(user: current_user)
    like&.destroy
  
    render json: { like_count: @likeable.likes.count, liked: false }
  end


  def find_likeable
    if params[:quote_id]
      @likeable = Quote.find(params[:quote_id])
    elsif params[:post_id]
      @likeable = Post.find(params[:post_id])
    elsif params[:reply_id]
      @likeable = Reply.find(params[:reply_id])
    end
  end
  

  private

  
end
