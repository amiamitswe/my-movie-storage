  // function for title limite
  const limitTitle = (text, value = 30) => {
    const result = []
    if (text) {
      if (text.length > value) {
        text.split(' ').reduce((acc, cur) => {
          if (acc + cur.length <= value) {
            result.push(cur)
          }
          return acc += cur.length
        }, 0)
        return (result.join(' ') + ' ...')
      }
    }
    return text
  }

  export default limitTitle