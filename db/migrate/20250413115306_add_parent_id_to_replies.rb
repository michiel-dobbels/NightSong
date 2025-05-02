class AddParentIdToReplies < ActiveRecord::Migration[8.0]
  def change
    add_column :replies, :parent_id, :integer
  end
end
