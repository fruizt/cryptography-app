from collections import defaultdict
import numpy as np

#Gamm-Pentagonal Class
class GammaPentagonal():
    def __init__(self,init,permutation,alphabet,len_v):
        self.alpabeth=alphabet #size alphabet
        self.init=init #initial point
        self.permutation=permutation #permutation encrypt
        self.len_v=len_v

        #set default values Encrypt
        self.default_Encrypt=self.withOutMatch()
        #make some process
        self.scatter_plot,self.lines_plot,self.count=self.makeGraph()
        self.permutation_graph=self.preProcess()
        self.matrix_plot=self.plotMatrix()
    

    #function to generate data for plots graph Gamma
    #return point to scatter plot and lines plots and count of trajectories
    def makeGraph(self):
        #dictionary that save number of trajectories 
        count_dictionary=defaultdict(lambda: 0)
        #save point to plot scatter plot
        scatter={(self.init[0],self.init[1])}
        #save all lines to plot
        lines=[]
        #------------Generation #1
        #points that start in the Generation #2
        gen2=[]
        #first line 
        line=[[self.init[0]],[self.init[1]]]
        last=self.init
        for m in range(self.alpabeth+1):
            new_Point=[last[0]+1,last[1]+m]
            #save values x,y to Scatterplot 
            scatter.add((new_Point[0],new_Point[1]))
            #save values x,y to linePlot
            line[0].append(new_Point[0])
            line[1].append(new_Point[1])
            # count trajectories
            count_dictionary[(new_Point[0],new_Point[1])]+=1
            #change pivot node
            gen2.append(new_Point)
            last=new_Point
        lines.append(line)
        #------------Generation #2
        
        #points that start in the Generation #3

        gen3=defaultdict(lambda: -1)
        for point in gen2[::-1]:
            #first line 
            line=[[point[0]],[point[1]]]
            last=point
            for m in range(self.alpabeth+1):
                new_Point=[last[0]+1,last[1]+m]
                #save values x,y to Scatterplot 
                scatter.add((new_Point[0],new_Point[1]))
                #save values x,y to linePlot
                line[0].append(new_Point[0])
                line[1].append(new_Point[1])
                # count trajectories
                count_dictionary[(new_Point[0],new_Point[1])]+=1
                #change pivot node
                flag=gen3[(new_Point[0],new_Point[1])]
                #save the max slope 
                gen3[(new_Point[0],new_Point[1])]=max(flag,m)
                last=new_Point
            lines.append(line)
        #------------Generation #3
        for point in gen3:
            #first line 
            line=[[point[0]],[point[1]]]
            last=point
            for m in range(gen3[point]+1):
                new_Point=[last[0]+1,last[1]+m]
                #save values x,y to Scatterplot 
                scatter.add((new_Point[0],new_Point[1]))
                #save values x,y to linePlot
                line[0].append(new_Point[0])
                line[1].append(new_Point[1])
                # count trajectories
                count_dictionary[(new_Point[0],new_Point[1])]+=1
                #change pivot node
                last=new_Point
            lines.append(line)
        #reshape scatter 
        new_scatter=[[],[]]
        for point in scatter:
            new_scatter[0].append(point[0])
            new_scatter[1].append(point[1])
        return new_scatter,lines,count_dictionary



    #function to count trayectories and apply permutation
    # return finalMatrix    
    def preProcess(self):
        #len in x 
        #make the alphabet
        letters=[[(i+j)%26 for j in range(26)] for i in range(self.len_v)]
        letters=np.asarray(letters).T

        #Apply permutation
        permutation_transform=letters[:,self.permutation]

        #save count number of trayectories of each class
        number_trajectories=defaultdict(lambda: 0)
        
        #count trayectories for each class 
        for i in range(26):
            for j in range(self.len_v):
                number_trajectories[j+i]+=self.count[(j,i)]

        #apply transformation of trajectories
        for i in range(26):
            for j in range(self.len_v):
                permutation_transform[i][j]+=number_trajectories[j+i]
                permutation_transform[i][j]%=26

        #return final matrix
        return permutation_transform

    def plotMatrix(self):
        #input: self.permutation_graph
        #convert permutation_graph to plot format
        x=[]
        y=[]
        texts=[]
        for i in range(26):
            for j in range(self.len_v):
                num=self.permutation_graph[i,j]
                x.append(j)
                y.append(i)
                texts.append(chr(num+97))
        return [x,y,texts]

    def proccesText(self,text):
        text=''.join(e for e in text if e.isalnum())
        text=text.lower()
        textCiph=[ord(letter)-97 for letter in text]
        return textCiph

    #function that create the dictionary for unfound values 
    def withOutMatch(self):
        defaultEncrypt={}
        for i in range(26):
            defaultEncrypt[i]=[11,25-i]
        return defaultEncrypt

    def findPoint(self,num,column):
        count=0
        arraySearch=self.permutation_graph
        result=self.default_Encrypt[num]
        while count<=self.len_v:
            for index in range(26):
                if arraySearch[index,column]==num:
                    result=[column,index]
                    break
            count+=1
            column+=1
            column%=self.len_v
        return result

    def encryptGammaPentagonal(self,txt):
        text=self.proccesText(txt)
        resultCipher=[]
        for index in range(len(text)):
            pointToFind=text[index]
            resultCipher.append(self.findPoint(pointToFind,index%self.len_v))
        return resultCipher
    def decryptGammaPentagonal(self,code):
        text=[]
        info=self.permutation_graph
        
        for cod in code: 
            if cod[0]==11:
                num=25+cod[1]%26
            else:
                num=self.permutation_graph[cod[1],cod[0]]
            
            
            text.append(num)
        
        decrypt=[chr(num+97) for num in text ]
        return "".join(decrypt)
            

""" 
test=GammaPentagonal([0,0],[1,5,2,8,4,0,6,9,3,7],4,10)
res=test.encryptGammaPentagonal("hello world to the new employess in the new world,.:")
print(res)
decr=test.decryptGammaPentagonal(res)
print(decr)
a,b=makeGraph()
fig = go.Figure()
fig.add_trace(go.Scatter(x=a[0],y=a[1],mode="markers",marker=dict(color="red")))

for i in b:
  fig.add_trace(go.Scatter(x=i[0], y=i[1], mode="lines",line=dict(color="blue")))
fig.update_yaxes(
    scaleanchor = "x",
    scaleratio = 1,
  )
fig.show() """



