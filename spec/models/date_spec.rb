require 'rails_helper'
require 'csv'
load 'date.rb'

RSpec.describe Date, type: :model do
  let(:file) {
    raw_data = File.read(Rails.root.join("spec/uhj-reduced-dates/#{file_name}"))
    data = CSV.parse(raw_data, headers: true)
    data.map {|row| row.map {|k,v| row[k] = v.to_i} }
    data
  }

  describe '[BULK TEST] #to_badi' do
    context 'calculating the Naw-Ruz dates' do
      let(:file_name) { 'naw-ruz.csv' }

      it 'returns the correct badi date' do
        file.map do|row|
          badi_date = BadiDate.new(row['b-year'], row['b-month'], row['b-day'])
          gregorian_date = Date.new(row['g-year'], row['g-month'], row['g-day'])

          expect(gregorian_date.to_badi).to eq badi_date
        end
      end
    end

    context 'calculating the Nineteen Days Feasts dates' do
      let(:file_name) { 'reduced-nineteen-days-feasts.csv' }

      it 'returns the correct badi date' do
        file.map do |row|
          badi_date = BadiDate.new(row['b-year'], row['b-month'], row['b-day'])
          gregorian_date = Date.new(row['g-year'], row['g-month'], row['g-day'])

          expect(gregorian_date.to_badi).to eq badi_date
        end
      end
    end
  end
end
