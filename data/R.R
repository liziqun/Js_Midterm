
library(sf)
library(tidyverse)
library("rjson")


data=as.data.frame(jsonlite::fromJSON('C:/Users/HP/Desktop/MidTerm/data/Airbnb_high.json'))
hist(data$yield)
quantile(data$yield,c(0.2,0.4,0.6,0.8))
