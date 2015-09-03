class Date
  def to_badi
    BadiDate.new(self)
  end

  def self.naw_ruz_day_for(year)
    {2015=>21,2016=>20,2017=>20,2018=>21,2019=>21,2020=>20,2021=>20,2022=>21,2023=>21,2024=>20,2025=>20,2026=>21,2027=>21,2028=>20,2029=>20,2030=>20,2031=>21,2032=>20,2033=>20,2034=>20,2035=>21,2036=>20,2037=>20,2038=>20,2039=>21,2040=>20,2041=>20,2042=>20,2043=>21,2044=>20,2045=>20,2046=>20,2047=>21,2048=>20,2049=>20,2050=>20,2051=>21,2052=>20,2053=>20,2054=>20,2055=>21,2056=>20,2057=>20,2058=>20,2059=>20,2060=>20,2061=>20,2062=>20,2063=>20,2064=>20}[year]
  end

  def self.naw_ruz_date_for(year)
    new(year, 3, naw_ruz_day_for(year))
  end

  def last_naw_ruz_date
    year_shift = (self > Date.naw_ruz_date_for(year)) ? 0 : -1
    Date.naw_ruz_date_for(year + year_shift)
  end

  def next_naw_ruz_date
    year_shift = (self > Date.naw_ruz_date_for(year)) ? 1 : 0
    Date.naw_ruz_date_for(year + year_shift)
  end

  def days_since_last_naw_ruz
    (self - last_naw_ruz_date).to_i
  end

  def days_until_next_naw_ruz
    (next_naw_ruz_date - self).to_i
  end

  def self.nineteen_days_feasts_for(year)
    initial_date = naw_ruz_date_for(year)
    (1..365).map do |d|
      day = initial_date + d
      day if day.to_badi.day == 1
    end.compact
  end
end