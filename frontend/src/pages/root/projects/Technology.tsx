import React, { useState, useEffect } from 'react'
import { getTechnology } from '../../../api/technologies';
import { ITechnology } from '../../../interface/technologies';

type Props = {
    techId: number|string
}

const Technology = ({techId}: Props) => {
    const [technology, setTechnology] = useState<ITechnology>();
    useEffect(() => {
      getTechnology(techId)
      .then(({data}) => setTechnology(data))
    },[])
  return (
    <>
        <i className={`bx bxl-${technology?.tag} projects__tag-icon`}></i>
    </>
  )
}

export default Technology