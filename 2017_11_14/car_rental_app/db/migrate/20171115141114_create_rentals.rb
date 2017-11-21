class CreateRentals < ActiveRecord::Migration[5.0]
  def change
    create_table :rentals do |t|
      t.references :client, foreign_key: true
      t.references :car, foreign_key: true
      t.timestamp :date_start
      t.timestamp :date_end

      t.timestamps
    end
  end
end
