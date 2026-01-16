import './style.css'

export default function CenterContent() {
  const features = [
    {
      title: '创意设计',
      description: '融合艺术与技术，打造独特的视觉体验',
      icon: '✨',
    },
    {
      title: '流畅交互',
      description: '基于 React Three Fiber 的高性能 3D 渲染',
      icon: '🚀',
    },
    {
      title: '响应式布局',
      description: '完美适配各种设备，随时随地展现精彩',
      icon: '📱',
    },
  ]

  return (
    <section className="center-content">
      <div className="content-wrapper">
        <div className="intro-section">
          <h2 className="intro-title">探索无限可能</h2>
          <p className="intro-description">
            将创意转化为现实，用技术赋予设计生命力。
            在这里，每一个像素都承载着对美的追求。
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
