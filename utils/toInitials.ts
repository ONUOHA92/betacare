import * as _ from 'lodash'

function toInitials(name: string) {
  const displayName = _.trim(name)
  const split = _.filter(displayName.split(' '), (i) => !!i.length)

  // if display name is only one word then take its first two letters
  if (split.length < 2) {
    return displayName.substr(0, 2).toUpperCase()
  }

  // if display name is make from more then one word then take first word first letter
  // and second word first letter
  return `${split[0][0]}${split[1][0]}`.toUpperCase()
}

export default toInitials
