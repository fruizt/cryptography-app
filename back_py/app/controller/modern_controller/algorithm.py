from collections import defaultdict
import plotly.graph_objects as go
import numpy as np

#Gamm-Pentagonal Class
class GammaPentagonal():
    def __init__(self,init,permutation,alphabet,len_v):
        self.alpabeth=alphabet #size alphabet
        self.init=init #initial point
        self.permutation=permutation #permutation encrypt
        self.len_v=len_v

        #make some process
        self.scatter_plot,self.lines_plot,self.count=self.makeGraph()
        self.permutation_graph,self.totalTrajectories,self.translation=self.preProcess()
    
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

        #count number of trayectories of each class
        number_trajectories=defaultdict(lambda: 0)
        #apply translation
        translation=np.asarray([[0 for i in range(self.len_v)] for i in range(26)])
        
        #count trayectories for each class and save translation
        for i in range(26):
            for j in range(self.len_v):
                number_trajectories[letters[i][j]]+=self.count[(j,i)]
        for i in range(26):
            for j in range(self.len_v):
                translation[i,j]=number_trajectories[letters[i][j]]
                

        #permutation
        
        #apply permutation
        print(letters)
        print(number_trajectories)
        print(translation,"**/**/*/")
        print((letters+translation)%26,"*****************")
        translation_matrix=(letters+translation)%26
        permutation_graph=translation_matrix[:,self.permutation]
        translation=translation[:,self.permutation]
        
        
        return permutation_graph,number_trajectories,translation

    def plotMatrix(self):
        #input: self.permutation_graph
        #convert permutation_graph to plot format
        pass

    def proccesText(self,text):
        text=''.join(e for e in text if e.isalnum())
        text=text.lower()
        textCiph=[ord(letter)-97 for letter in text]
        return textCiph
    def findPoint(self,num,column):
        count=0
        arraySearch=self.permutation_graph
        result=[0,column]
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
        print(self.permutation_graph)
        print(self.totalTrajectories)
        print(code,"*******")
        for cod in code: 
            num=self.permutation_graph[cod[1],cod[0]]
            print(num)
            count_num=self.translation[cod[1],cod[0]]
            print(count_num)
            print("*------")
            num_result=(num)%26
            text.append(num_result)
        print(text)
        decrypt=[chr(num+97) for num in text ]
        return "".join(decrypt)
            


test=GammaPentagonal([0,0],[1,0,2,3,4,5,6,7,8,9],12,10)
res=test.encryptGammaPentagonal("abcdez")
print(res)
decr=test.decryptGammaPentagonal(res)
print(decr)
""" a,b=makeGraph()
fig = go.Figure()
fig.add_trace(go.Scatter(x=a[0],y=a[1],mode="markers",marker=dict(color="red")))

for i in b:
  fig.add_trace(go.Scatter(x=i[0], y=i[1], mode="lines",line=dict(color="blue")))
fig.update_yaxes(
    scaleanchor = "x",
    scaleratio = 1,
  )
fig.show() """



