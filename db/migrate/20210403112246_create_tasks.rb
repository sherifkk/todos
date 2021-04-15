class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks, id: :uuid do |t|
      t.text :title
      t.boolean :completed
      t.text :user_id

      t.timestamps
    end
  end
end
