import { logger } from '../../lib/index';
import Segments from '../../lib/segments/index';

export default function respond(event, cb) {
  logger().info('= listSegmentMembers.action', JSON.stringify(event));
  return Segments.getSegment(event.listId, event.segmentId)
    .then(segment => Segments.listSegmentMembersFromConditions(segment.conditions, event.from || 0, event.size || 10))
    .then(members => cb(null, members))
    .catch((err) => {
      logger().error(err);
      return cb(err);
    });
}

