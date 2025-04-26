class LikesController < ApplicationController
  before_action :find_likeable

  def create
    unless @likeable.likes.exists?(user: current_user)
      @likeable.likes.create(user: current_user)
    end
  
    respond_to do |format|
      format.html { redirect_back fallback_location: posts_path }
      format.json { render json: { like_count: @likeable.likes.count, like_id: @likeable.likes.find_by(user: current_user)&.id }, status: :created }
    end
  end
  

  def destroy
    @likeable.likes.find_by(user: current_user)&.destroy

    respond_to do |format|
      format.html { redirect_back fallback_location: posts_path }
      format.json { render json: { like_count: @likeable.likes.count }, status: :ok }
    end
  end

  private

  def find_likeable
    if params[:post_id]
      @likeable = Post.find(params[:post_id])
    elsif params[:reply_id]
      @likeable = Reply.find(params[:reply_id])
    end
  end
end
