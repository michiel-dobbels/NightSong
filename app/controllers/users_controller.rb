class UsersController < ApplicationController
    def show
      puts "DEBUG: params[:id] = #{params[:id]}" 
      @user = User.find(params[:id])
      @posts = @user.posts.order(created_at: :desc)
      @follower_count = @user.followers.count
    end

    def followers
      @user = User.find(params[:id])
      @followers = @user.followers
    end
    
    def following
      @user = User.find(params[:id])
      @following = @user.following
    end
    
  end
  