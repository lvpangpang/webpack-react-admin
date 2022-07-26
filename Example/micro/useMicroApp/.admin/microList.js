
export default function getMicroList() {
  return Promise.all([import('app1/list')])
}
  