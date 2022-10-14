# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

june = EventMonth.create!(name: "June")

# create_table :events do |t|
#     t.string :title
#     t.datetime :starts
#     t.datetime :ends
#     t.string :details
#     t.string :location

e1 =  Events.create!(title: "Shenandoah Camping Trip", starts: "2022-06-12", ends: "2022-06-17", details: "A verity summer youth camp for children between ages 5-17.", location: "Shenandoah National Park Skyline Dr Mile 57.5 Elkton, VA 22835 United States" )

# t.string :first_name
#       t.string :last_name
#       t.string :username
#       t.string :email
#       t.string :password

u1 = User.create!(last_name: "Steve", username: "steve", email: "steve@gmail.com", password: "Q")
