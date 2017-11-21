class CreateClients < ActiveRecord::Migration[5.0]
  def change
    create_table :clients do |t|
      t.string :name
      t.string :address
      t.string :cpf
      t.string :rg

      t.timestamps
    end
  end
end
