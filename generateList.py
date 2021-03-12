#!/bin/python3
# -*- coding: utf-8 -*-

import sys, getopt, json

def usage():
  print ('-i <inputfile> -o <outputfile>')
    
try:
    opts, args = getopt.getopt(sys.argv[1:],"hi:o:")
except getopt.GetoptError:
      usage()
      sys.exit(2)

inputFile=None
outputFile=None
verbose=False

for o, a in opts:
        if o == "-v":
            verbose = True
        elif o in ("-h", "--help"):
            usage()
            sys.exit()
        elif o in ("-o", "--ofile"):
            outputFile = a
        elif o in ("-i", "--ifile"):
            inputFile = a
        else:
            assert False, "unhandled option"


# Build word list
content={"title":"Русский","catchPhrase":"Test how well you know Русский","cards":{}}
cards=[]

# Parse each line
with open(inputFile) as f:
    for line in f:
        lineArray=line.strip().replace(" ","").split("=")
        cards.append({"russian":lineArray[0],"english":lineArray[1]})

content["cards"]=cards
#print(content)

# Write to JSON
#print(json.dumps(content))

# Write JSON to file
with open(outputFile, 'w',encoding='utf8') as outfile:
    json.dump(content, outfile, ensure_ascii=False)