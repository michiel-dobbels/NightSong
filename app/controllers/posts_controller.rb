class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    @posts = Post.all.order(created_at: :desc)
  end

  def show
    @post = Post.find(params[:id])
    @child_replies = @post.replies.where(parent_id: nil) # only top-level replies to this post


  end
  
  def following
    @posts = Post.includes(:user)
                 .where(user: current_user.following)
                 .order(created_at: :desc)
  end
  

  def new
    @post = current_user.posts.build
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      redirect_to posts_path, notice: "Post created!"
    else
      render :new
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.user == current_user
      @post.destroy
      redirect_to posts_path, notice: "Post deleted."
    else
      redirect_to posts_path, alert: "You can only delete your own posts."
    end
  end

  private

  def set_post
    @post = Post.find(params[:id])
    @reply = Reply.new
  end

  def post_params
    params.require(:post).permit(:content, :image, :video)
  end
end
