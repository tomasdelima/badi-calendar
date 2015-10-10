require 'csv'

def read_csv_file(file_name)
  raw_data = File.read(Rails.root.join("spec/uhj-reduced-dates/#{file_name}"))
  data = CSV.parse(raw_data, headers: true)
  data.map {|row| row.map {|k,v| row[k] = v.to_i == 0 ? v : v.to_i} }
  data
end

read_csv_file('twin-holidays.csv').map do |row|
  Holiday.create(name: "Birth of The Báb", date: Date.new(row['g-bab-year'], row['g-bab-month'], row['g-bab-day']))
  Holiday.create(name: "Birth of Bahá'u'lláh", date: Date.new(row['g-baha-year'], row['g-baha-month'], row['g-baha-day']))
end

read_csv_file('other-holidays.csv').map do |row|
  (2015..2064).map do |year|
    Holiday.create(name: row['holiday'], date: Date.new(year, row['g-month'], row["#{Date.naw_ruz_day_for(year)}-march-nawruz-g-day"]))
  end
end
