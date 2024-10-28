import { Button } from 'react-bootstrap'
import { Empresas } from '../../screens/PageEmpresa/Empresas'
import styles from './MenuEmpresa.module.css'
import { FiChevronDown } from 'react-icons/fi'
import { useState } from 'react'

export const MenuEmpresa = () => {
const [showBusinees , setShowBusinnes]=useState(false);
const handleBusinnes=()=>{
  setShowBusinnes(!showBusinees)
}
  return (
    <div className={styles.menuEmpresa}>
        <button className='d-flex w-100 p-2 gap-2 text-align-center align-items-center justify-content-center ' style={{height:'10%', justifyContent:'center', width:'100px' , background: 'none', border: 'none'}} onClick={handleBusinnes}>
            <h2 className='m-0'>Empresas</h2> 
            <FiChevronDown style={{fontSize:'2.5rem', paddingTop:'2%'}}/>
        </button>
      {showBusinees ? (<div   className='d-flex flex-column w-100 gap-3 mt-4'
          style={{ height: 'auto' }}>
          {
            Empresas.map((empresa)=>(
              <div key={empresa.name} className='d-flex  align-items-center justify-content-center ' style={{width:'100%'}}>
                <Button  variant="outline-dark"  style={{width:'80%', maxWidth:'300px'}}>{empresa.name}</Button>
              </div>
            ))
          }
        </div>): "" }
    </div>
  )
}
