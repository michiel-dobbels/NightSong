class RenameCommentsToReplies < ActiveRecord::Migration[8.0]
  def change
    rename_table :comments, :replies
  end
end
