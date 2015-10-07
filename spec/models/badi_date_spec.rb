require 'rails_helper'
require 'csv'

RSpec.describe BadiDate, type: :model do
  let(:years) { (172..220) }
  let(:badi_date) { BadiDate.new(172, 9, 15) }
  let(:file) {
    raw_data = File.read(Rails.root.join("spec/uhj-reduced-dates/#{file_name}"))
    data = CSV.parse(raw_data, headers: true)
    data.map {|row| row.map {|k,v| row[k] = v.to_i} }
    data
  }

  it 'responds to day, month and year' do
    expect(badi_date).to respond_to(:day)
    expect(badi_date).to respond_to(:month)
    expect(badi_date).to respond_to(:year)
  end

  describe '[BULK TEST] #to_gregorian' do
    context 'calculating the Naw-Ruz dates' do
      let(:file_name) { 'naw-ruz.csv' }

      it 'returns the correct gregorian date' do
        file.map do|row|
          badi_date = BadiDate.new(row['b-year'], row['b-month'], row['b-day'])
          gregorian_date = Date.new(row['g-year'], row['g-month'], row['g-day'])

          expect(badi_date.to_gregorian).to eq gregorian_date
        end
      end
    end

    context 'calculating the Nineteen Days Feasts dates' do
      let(:file_name) { 'reduced-nineteen-days-feasts.csv' }

      it 'returns the correct gregorian date' do
        file.map do |row|
          badi_date = BadiDate.new(row['b-year'], row['b-month'], row['b-day'])
          gregorian_date = Date.new(row['g-year'], row['g-month'], row['g-day'])

          expect(badi_date.to_gregorian).to eq gregorian_date
        end
      end
    end

    context 'calculating the Ayyám-i-Há dates' do
      let(:file_name) { 'ayyam-i-ha.csv' }

      it 'returns the correct gregorian date' do
        file.map do |row|
          first_badi_date = BadiDate.new(row['g-year'] - 1844, 18.5, 1)
          last_badi_date = BadiDate.new(row['g-year'] - 1844, 18.5, row['duration'].to_i)

          first_gregorian_date = Date.new(row['g-year'], row['first-month'], row['first-day'])
          last_gregorian_date = Date.new(row['g-year'], row['last-month'], row['last-day'])

          expect(first_badi_date.to_gregorian).to eq first_gregorian_date
          expect(last_badi_date.to_gregorian).to eq last_gregorian_date
        end
      end
    end

    context 'calculating the twin holidays dates' do
      let(:file_name) { 'twin-holidays.csv' }

      it 'returns the correct gregorian date' do
        file.map do |row|
          badi_date = BadiDate.new(row['b-bab-year'], row['b-bab-month'], row['b-bab-day'])
          gregorian_date = Date.new(row['g-bab-year'], row['g-bab-month'], row['g-bab-day'])
          expect(badi_date.to_gregorian).to eq gregorian_date

          badi_date = BadiDate.new(row['b-baha-year'], row['b-baha-month'], row['b-baha-day'])
          gregorian_date = Date.new(row['g-baha-year'], row['g-baha-month'], row['g-baha-day'])
          expect(badi_date.to_gregorian).to eq gregorian_date
        end
      end
    end
  end

  describe '#holiday?' do
    let(:badi_date) { BadiDate.new(200, 1, 5) }

    context 'when it is a holiday' do
      let!(:holiday) { Holiday.create(date: badi_date.to_gregorian, name: 'Holiday Name') }

      it 'returns true' do
        expect(badi_date.holiday?).to eq true
      end
    end

    context 'when it is not a holiday' do
      it 'returns false' do
        expect(badi_date.holiday?).to eq false
      end
    end
  end
end
