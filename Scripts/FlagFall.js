///api_version=2
(script = registerScript({
    name: "PhaseFall",
    authors: ["CzechHek"],
    version: "1.2"
})).import("Core.lib");

module = {
    category: "Player",
    description: "NoFall using phase to negate damage. (inspired by yorik100)",
    onPacket: function (e) {
        if (e.getPacket() instanceof C03PacketPlayer && e.getPacket().isMoving()) {
            if (e.getPacket().onGround) {
                if (hurts) {
                    e.getPacket().y -= 0.0625 + 1e-14;
                    willFlag = !(hurts = e.getPacket().onGround = mc.getNetHandler().addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false)));
                }
            } else hurts = mc.thePlayer.fallDistance > 3.4;
        } else if (willFlag && e.getPacket() instanceof S08PacketPlayerPosLook) willFlag = e.cancelEvent();
    },
    onMove: function (e) {
        willFlag && e.zero();
    }
}

var willFlag, hurts;