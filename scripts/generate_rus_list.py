#!/usr/bin/python3
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
content={"title":"Русский","catchPhrase":"Test how well you know Русский","words":{}}
words=[]

# Parse each line
with open(inputFile) as f:
    for line in f:
        #lineArray=line.strip().replace(" ","").split("=")
        #lineArray=line.strip().split("=")
        #lineArray=line.strip().split("=")
        lineArray=line.strip().split(",")
        if(len(lineArray)!=1):
            #words.append({"russian":lineArray[0].strip(),"english":lineArray[1].strip()})
            #words.append({lineArray[0].strip():lineArray[1].strip()})
            #words.append({"rus":lineArray[0].strip(),"eng":lineArray[1].strip(),"category":[]})
            words.append({"rus":lineArray[0].strip(),"eng":lineArray[1].strip(),"category":lineArray[2].split(";")})

content["words"]=words
#print(content)

# Write to JSON
#print(json.dumps(content))
#sys.exit(0)

# Write JSON to file
with open(outputFile, 'w',encoding='utf8') as outfile:
    outfile.write("wordDeck=")
    json.dump(content, outfile, ensure_ascii=False)
