class QuotesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_entity, only: [:create]


  
    def create
      @quote = @entity.quotes.build(quote_params)
      @quote.user = current_user
  
      if @quote.save
        redirect_to @entity
      else
        redirect_to @entity, alert: "Could not save quote."
      end
    end
  
    def destroy
      quote = Quote.find(params[:id])
      if quote.user == current_user
        quote.destroy
        redirect_back fallback_location: root_path, notice: "Quote deleted."
      else
        redirect_back fallback_location: root_path, alert: "Not authorized to delete this quote."
      end
    end
    
    private
  
    def set_entity
      @entity = Entity.find(params[:entity_id])
    end
  
    def quote_params
      params.require(:quote).permit(:content)
    end
  end
  