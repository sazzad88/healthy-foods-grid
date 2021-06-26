import React, { FunctionComponent, useEffect, useRef } from 'react'
import styles from './ProgressIndicator.module.css'

type ModalProps = {
  message: string
}

const Indicator: FunctionComponent<ModalProps> = ({ message, children }) => {
  const inputEl = useRef<HTMLDivElement>(null)
  useEffect(() => {
    inputEl.current!.style.width = '0%'
    let start_width = 0,
      increaseTimer = setInterval(() => {
        if (start_width >= 100) clearInterval(increaseTimer)
        else {
          start_width++

          inputEl.current!.style.width = start_width + '%'
        }
      }, 10)

    return () => {
      clearInterval(increaseTimer)
    }
  }, [])

  return (
    <div className={styles.notificationContainer} style={{ width: '100%' }}>
      <p style={{ textAlign: 'center', marginBottom: '15px' }}>{message}</p>
      <div style={{ width: '100%' }}>
        <div ref={inputEl} className={styles.progressIndicator}>
          &nbsp;
        </div>
      </div>
    </div>
  )
}

export default Indicator
