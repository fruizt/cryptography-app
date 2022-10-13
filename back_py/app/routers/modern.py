from fastapi import APIRouter
from app.schemas import *
from app.controller.modern_controller.gammaPentagonal_controller import *

router = APIRouter(
    prefix="/modern",
    tags=["Modern"]
)

##Gamma Pentagonal
#define flag deafult permutation
@router.post("/encrypt/gamma_graph")
async def ceasar_cypher(data : GammaPentagonalRequest):
    permutation=list(map(int,data.permutation.split("-")))
    init=list(map(int,data.init.split(",")))
    system=GammaPentagonal(init,permutation,4,10)

    return {"scatterPlot":system.scatter_plot,"linePlot":system.lines_plot,"matrixPlot":system.matrix_plot}

@router.post("/encrypt/gamma_pentagonal")
async def ceasar_cypher(data : GammaPentagonalRequest):
    permutation=list(map(int,data.permutation.split("-")))
    init=list(map(int,data.init.split(",")))
    system=GammaPentagonal(init,permutation,4,10)
    encrypt_text=system.encryptGammaPentagonal(data.text)
    return {"encryptText":f"{encrypt_text}"[1:-1]}

@router.post("/decrypt/gamma_pentagonal")
async def ceasar_cypher(data : GammaPentagonalRequest):
    permutation=list(map(int,data.permutation.split("-")))
    init=list(map(int,data.init.split(",")))
    system=GammaPentagonal(init,permutation,4,10)
    lista = data.text.replace('[','')
    lista = lista.replace(' ','')
    lista = lista.split(']')
    lista = [i.lstrip(',') for i in lista]
    if (lista[-1] == ""): lista = lista[:-1]
    lista = [list(map(int,i.split(','))) for i in lista]
    encrypt_text=system.decryptGammaPentagonal(lista)
    return {"encryptText":encrypt_text.upper()}


