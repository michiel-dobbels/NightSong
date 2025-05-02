class SearchController < ApplicationController
    def index
      @query = params[:query]
      @posts = Post.where("LOWER(content) LIKE ?", "%#{@query.downcase}%")
      @users = User.where("LOWER(full_name) LIKE ? OR LOWER(email) LIKE ?", "%#{@query.downcase}%", "%#{@query.downcase}%")
      @replies = Reply.where("LOWER(content) LIKE ?", "%#{@query.downcase}%")
  
    end
  end
  