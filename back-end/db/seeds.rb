DashboardDocument.create(description: 'New Document')

Event.destroy_all

e1 =  Event.create!(title: "Shenandoah Camping Trip", starts: DateTime.new(2022, 06, 12, 9, 00, 0), ends: DateTime.new(2022, 06, 17, 13, 00, 0), details: "A verity summer youth camp for children between ages 5-17.", address_line_1: "Shenandoah National Park Skyline Dr Mile 57.5", address_line_2: "", city:"Elkton", state_province_region: "Virginia", zip_postalcode: "22835", country: "United States" )
e2 =  Event.create!(title: "Test1", starts: DateTime.new(2022, 04, 18, 10, 00, 0), ends: DateTime.new(2022, 04, 22, 13, 00, 0), details: "test", address_line_1: "test", address_line_2: "", city:"", state_province_region:"t", zip_postalcode: "", zip_postalcode: "", country: "" )
e3 =  Event.create!(title: "Test2", starts: DateTime.new(2022, 04, 20, 10, 00, 0), ends: DateTime.new(2022, 04, 22, 14, 00, 0), details: "tests", address_line_1: "tests", address_line_2: "", city:"", state_province_region:"", zip_postalcode: "", zip_postalcode: "0", country: "" )
e4 =  Event.create!(title: "Test3", starts: DateTime.new(2022, 05, 10, 10, 00, 0), ends: DateTime.new(2022, 05, 10, 14, 00, 0), details: "tests3", address_line_1: "tests3", address_line_2: "t", city:"", state_province_region:"", zip_postalcode: "", zip_postalcode: "", country: "" )
e5 =  Event.create!(title: "Test4", starts: DateTime.new(2022, 01, 10, 10, 00, 0), ends: DateTime.new(2022, 12, 10, 14, 00, 0), details: "", address_line_1: "tests4", address_line_2: "", city:"", state_province_region:"", zip_postalcode: "", zip_postalcode: "", country: "t" )
e6 =  Event.create!(title: "Test5", starts: DateTime.new(2022, 05, 10, 10, 00, 0), ends: DateTime.new(2022, 05, 10, 14, 00, 0), details: "tests3", address_line_1: "tests3", address_line_2: "", city:"", state_province_region:"", zip_postalcode: "", zip_postalcode: "", country: "" )


ButtonVisibleConfig.create!

puts "Done seeding!"
