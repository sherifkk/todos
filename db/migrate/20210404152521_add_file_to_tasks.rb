class AddFileToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :file, :string
  end
end
