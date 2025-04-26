
    class RepliesController < ApplicationController
        before_action :authenticate_user!
      
        def create
          if params[:reply_id]
            # Nested reply (replying to a reply)
            parent_reply = Reply.find(params[:reply_id])
            @reply = parent_reply.replies.build(reply_params)
            @reply.user = current_user
            @reply.post = parent_reply.post
          else
            # Reply to a post (existing behaviour)
            post = Post.find(params[:post_id])
            @reply = post.replies.build(reply_params)
            @reply.user = current_user
          end
        
          if @reply.save
            redirect_back fallback_location: root_path, notice: "Reply posted!"
          else
            redirect_back fallback_location: root_path, alert: "There was an error posting your reply."
          end
        end
        
      
        def destroy
          @reply = Reply.find(params[:id])
          if @reply.user == current_user
            @reply.destroy
            redirect_to post_path(@reply.post), notice: "Reply deleted."
          else
            redirect_to post_path(@reply.post), alert: "You can only delete your own replies."
          end
        end
        
        def show
          @reply = Reply.find(params[:id])
          @post = @reply.post
          @child_replies = @reply.replies
        
          # Build the chain of parent replies
          @parent_chain = []
          parent = @reply.parent
        
          while parent
            @parent_chain.unshift(parent) # add to the beginning of the array
            parent = parent.parent
          end
        end
        
        
        
        
      
        private
      
        def reply_params
          params.require(:reply).permit(:content)
        end
      end
      

