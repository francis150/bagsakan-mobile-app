
export default function StaticData(file) {
  switch (file) {
    case 'ph-places':
        return require('./ph_places.json')
    default:
        break;
  }
}