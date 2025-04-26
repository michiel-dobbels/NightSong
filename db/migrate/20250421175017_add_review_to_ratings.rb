class AddReviewToRatings < ActiveRecord::Migration[8.0]
  def change
    add_column :ratings, :review, :text
  end
end
