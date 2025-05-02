
    class RepliesController < ApplicationController
        before_action :authenticate_user!
      
        def create
          if params[:reply_id]
            parent_reply = Reply.find(params[:reply_id])
            @reply = parent_reply.replies.build(reply_params)
            @reply.user = current_user
            @reply.post = parent_reply.post
          else
            post = Post.find(params[:post_id])
            @reply = post.replies.build(reply_params)
            @reply.user = current_user
          end
        
          if @reply.save
            render json: {
              id: @reply.id,
              content: @reply.content,
              user_name: @reply.user.full_name
            }
          else
            render json: { error: "Could not save reply." }, status: :unprocessable_entity
          end
        end
        
        
        
      
        def destroy
          @reply = Reply.find(params[:id])
          if @reply.user == current_user
            @reply.destroy
            respond_to do |format|
              format.json { head :no_content } # for fetch/AJAX
              format.html { redirect_to post_path(@reply.post), notice: "Reply deleted." }
            end
          else
            respond_to do |format|
              format.json { render json: { error: "Unauthorized" }, status: :unauthorized }
              format.html { redirect_to post_path(@reply.post), alert: "You can only delete your own replies." }
            end
          end
        end
        
        
        def show
          @reply = Reply.find(params[:id])
          @post = @reply.post
          @child_replies = @reply.replies
        
          # Build the chain of parent replies (for nesting)
          @parent_chain = []
          parent = @reply.parent
          while parent
            @parent_chain.unshift(parent)
            parent = parent.parent
          end
        
          @replies = @post.replies.map do |reply|
            reply.as_json.merge(
              liked_by_current_user: reply.likes.exists?(user: current_user),
              likes_count: reply.likes.count
            )
          end
        
          respond_to do |format|
            format.html # renders show.html.erb
            format.json { render json: @replies }
          end
        end
        
        
        
        
        
        
      
        private
      
        def reply_params
          params.require(:reply).permit(:content)
        end
      end
      

