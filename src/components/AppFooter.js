import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a target="_blank" rel="noopener noreferrer">
          Selaras
        </a>
        <span className="ms-1">&copy; 2022 </span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
