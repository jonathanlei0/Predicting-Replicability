import sys
import os
import json
import time
import numpy as np
from pymongo import MongoClient
import hashlib
import argparse

np.set_printoptions(precision=3, suppress=True)

parser = argparse.ArgumentParser()
parser.add_argument("port", help="mongodb port to connect", type=int)
args = parser.parse_args()


### Hyper-parameters
MAX_ASSIGNMENT_PER_PAPER = 50

dire = "../public/paper_data/title/"
paper_md5_id_list = []
paper_exp_id_list = []
paper_title_list = []
for file_name in np.sort(os.listdir(dire)):
    if file_name.startswith("[title]"):
        file = open(dire+file_name, 'r')
        title = file.read()
        file.close()
        paper_title_list.append(title)
        paper_exp_id_list.append(int(file_name[7:-4]))
        paper_md5_id_list.append(hashlib.md5(title.encode()).hexdigest())
#        print(file_name)
#        print(title)

paper_md5_id_list = np.array(paper_md5_id_list, dtype=str)
paper_title_list = np.array(paper_title_list, dtype=str)
paper_exp_id_list = np.array(paper_exp_id_list)

paper_order = np.argsort(paper_exp_id_list)
paper_md5_id_list = paper_md5_id_list[paper_order]
paper_exp_id_list = paper_exp_id_list[paper_order]
paper_title_list = paper_title_list[paper_order]

print(np.vstack((paper_exp_id_list, paper_md5_id_list, paper_title_list)).T)
#print(paper_md5_id_list)
print(len(paper_title_list))


# connect to DB:meteor and fetch the handle of collection:wageringPM
connection = MongoClient(f"mongodb://127.0.0.1:{args.port}/meteor")


# recreate the collection
clc = connection.meteor.paper
clc.drop()
for i in range(len(paper_title_list)):
    print(paper_exp_id_list[i], paper_title_list[i])
    entry = {"paper_md5_id": paper_md5_id_list[i],
             "paper_title": paper_title_list[i], 
             "paper_exp_id": int(paper_exp_id_list[i]),
             "paper_assigned_as_first_exp_paper": int(0),
             "paper_completed_as_first_exp_paper": int(0),
             "paper_assigned": int(0),
             "paper_completed": int(0),
             "paper_max_completion": int(MAX_ASSIGNMENT_PER_PAPER) 
            }
    clc.insert_one(entry)
    
clc_hyper_para = connection.meteor.hyperparameter
clc_hyper_para.drop()
clc_hyper_para.insert_one({'max_assign_per_batch_user': 3, 'max_assign_per_user': 15})