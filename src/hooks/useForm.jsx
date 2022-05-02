import React, { useState } from 'react'


export const useForm = (values = {}) => {
    
    const [valores, setvalores] = useState(values)

    const handleChange = ({target}) => {

        setvalores({
            ...valores,
            [target.name] : target.value
        })

    }

    return [ valores, handleChange]
  
}


