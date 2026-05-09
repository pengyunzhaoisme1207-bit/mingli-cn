'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PaySuccessPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'checking' | 'success' | 'failed'>('checking')
  const [dots, setDots] = useState('')

  useEffect(() => {
    // 动态省略号动画
    const dotsInterval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 500)

    const pendingOrderNo = localStorage.getItem('pending_order_no')
    const pendingReportUrl = localStorage.getItem('pending_report_url')

    if (!pendingOrderNo || !pendingReportUrl) {
      router.replace('/')
      return
    }

    let attempts = 0
    const maxAttempts = 30 // 最多轮询30次（约60秒）

    const poll = setInterval(async () => {
      attempts++
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYMENT_CENTER_URL}/api/v1/pay/status?order_no=${pendingOrderNo}`
        )
        const data = await res.json()
        console.log(`[pay-success] 第${attempts}次轮询:`, data)

        if (data.status === 'paid') {
          clearInterval(poll)
          clearInterval(dotsInterval)
          localStorage.removeItem('pending_order_no')
          localStorage.removeItem('pending_report_id')
          localStorage.removeItem('pending_report_url')
          setStatus('success')
          // 1秒后跳转报告页
          setTimeout(() => {
            router.push(pendingReportUrl + '?unlocked=true')
          }, 1000)
        } else if (attempts >= maxAttempts) {
          clearInterval(poll)
          clearInterval(dotsInterval)
          setStatus('failed')
        }
      } catch (e) {
        console.error('[pay-success] 轮询失败:', e)
      }
    }, 2000)

    return () => {
      clearInterval(poll)
      clearInterval(dotsInterval)
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#07080D',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#E8E4D9',
      fontFamily: 'Inter, sans-serif'
    }}>
      {status === 'checking' && (
        <>
          <div style={{ fontSize: 48, marginBottom: 24 }}>⏳</div>
          <div style={{ fontSize: 20, marginBottom: 8 }}>正在确认支付{dots}</div>
          <div style={{ fontSize: 14, color: 'rgba(232,228,217,0.45)' }}>请稍候，正在验证支付状态</div>
        </>
      )}
      {status === 'success' && (
        <>
          <div style={{ fontSize: 48, marginBottom: 24 }}>✅</div>
          <div style={{ fontSize: 20, marginBottom: 8, color: '#C9A96E' }}>支付成功！</div>
          <div style={{ fontSize: 14, color: 'rgba(232,228,217,0.45)' }}>正在跳转到您的报告{dots}</div>
        </>
      )}
      {status === 'failed' && (
        <>
          <div style={{ fontSize: 48, marginBottom: 24 }}>⚠️</div>
          <div style={{ fontSize: 20, marginBottom: 16 }}>支付验证超时</div>
          <div style={{ fontSize: 14, color: 'rgba(232,228,217,0.45)', marginBottom: 24 }}>
            如果您已完成支付，请点击下方按钮手动查看报告
          </div>
          <button
            onClick={() => {
              const url = localStorage.getItem('pending_report_url')
              if (url) router.push(url + '?unlocked=true')
              else router.push('/')
            }}
            style={{
              background: '#C9A96E',
              color: '#07080D',
              border: 'none',
              padding: '12px 32px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: 6
            }}
          >
            查看我的报告
          </button>
        </>
      )}
    </div>
  )
}
