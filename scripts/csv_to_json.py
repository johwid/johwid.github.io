#!/bin/python3
# -*- coding: utf-8 -*-

import sys, csv, json

# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
     
    # create a dictionary
    data = {}

    content={"title":"Русский","catchPhrase":"Test how well you know Русский","words":{}}
    words=[]

    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        #csvReader = csv.reader(csvf,'googlesheetcsv')
         
        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
            # Assuming a column named 'No' to
            # be the primary key
            #key = rows['No']
            #data[key] = rows
            #print(rows['category'].split(";"))            
            rows['category']=rows['category'].split(";")

            words.append(rows)

    content["words"]=words 

    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write("wordDeck=")
        jsonf.write(json.dumps(content, indent=4,ensure_ascii=False))
        #jsonf.write(json.dumps(content,ensure_ascii=False))
         
# Driver Code
 
# Decide the two file paths according to your
# computer system
csvFilePath = sys.argv[1]
jsonFilePath = sys.argv[2]
 
# Call the make_json function
make_json(csvFilePath, jsonFilePath)
