macro followPathSetRef {
    case infix { $ret:ident = | $followPathSetRef(
        $follow, $list, $refPath,
        $refs, $refIndex, $refDepth, $refHeight, $refLength,
        $key, $isKeySet, $depth, $(
        $roots, $parents, $nodes) (,) ... $(
        $types, $values, $sizes, $timestamps, $expires) (,) ...
    ) } => {
    var nodes   = #{ $nodes   ... };
    var types   = #{ $types   ... };
    var values  = #{ $values  ... };
    var expires = #{ $expires ... };
    letstx $node   = nodes  .slice(0, 1);
    letstx $type   = types  .slice(0, 1);
    letstx $value  = values .slice(0, 1);
    letstx $expire = expires.slice(0, 1);
    return #{
        do {
            $node.promote($expire);
            $refs[$depth] = $value;
            $refIndex = $depth + 1;
            $refDepth = 0;
            $ret = $follow(
                $refDepth, $refHeight, $refLength, $value, $(
                $roots, $parents, $nodes) (,) ... , $(
                $types, $values, $sizes, $timestamps, $expires) (,) ...
            )
            $type = $node.type();
            $value = $node.value($type);
        } while($node.isLink($type, $value));
        if($node == null) {
            while($refDepth <= $refHeight) {
                $list[$refDepth] = $refPath[$refDepth++];
            }
        }
    }; }
    rule { } => { $[followPathSetRef] }
}
export followPathSetRef;