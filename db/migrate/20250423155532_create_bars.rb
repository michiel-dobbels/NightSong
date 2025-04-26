class CreateBars < ActiveRecord::Migration[8.0]
  def change
    create_table :bars do |t|
      t.references :user, null: false, foreign_key: true
      t.references :barable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
