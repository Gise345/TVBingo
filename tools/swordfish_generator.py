# Blender 3.x Python script — Stylized "TV Bingo" Swordfish Mascot (high‑poly)
# --------------------------------------------------------------------------------
# Builds a friendly high‑poly swordfish with optional carnival headdress, shirt band,
# basic rig, and a short looping "Swim" animation. Exports GLB.
#
# Usage:
# 1) Blender → Scripting → Open this file → set OUTPUT_PATH (optional) → Run (Alt+P).
# 2) Copy the exported swordfish.glb into your web project's public/assets/.
#
import bpy, bmesh, math, random
from mathutils import Vector, Euler

OUTPUT_PATH     = bpy.path.abspath("//swordfish.glb")
WITH_HEADDRESS  = True
WITH_SHIRT      = True
MAKE_RIG        = True
MAKE_ANIM       = True
HEADDRESS_FEATHERS = 18
BODY_BLUE       = (0.10, 0.30, 0.90, 1.0)
BELLY_WHITE     = (0.95, 0.96, 1.00, 1.0)
HEADDRESS_COLS  = [(1.00,0.35,0.00,1.0),(1.00,0.80,0.10,1.0),(0.15,0.70,1.0,1.0),(0.10,0.85,0.45,1.0),(0.80,0.15,0.65,1.0)]

def clean_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for b in bpy.data.meshes:
        if b.users == 0: bpy.data.meshes.remove(b)

def _mat_base(name, color):
    m = bpy.data.materials.new(name=name); m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = 0.45
    return m

def _mat_body_gradient(name, top_col, belly_col):
    m = bpy.data.materials.new(name=name); m.use_nodes = True
    nodes = m.node_tree.nodes; links = m.node_tree.links
    bsdf = nodes["Principled BSDF"]
    texcoord = nodes.new("ShaderNodeTexCoord")
    sep = nodes.new("ShaderNodeSeparateXYZ")
    ramp = nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.35
    ramp.color_ramp.elements[0].color = top_col
    ramp.color_ramp.elements[1].position = 0.65
    ramp.color_ramp.elements[1].color = belly_col
    links.new(texcoord.outputs["Object"], sep.inputs["Vector"])
    links.new(sep.outputs["Z"], ramp.inputs["Fac"])
    links.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
    return m

def _finify(obj, thickness=0.04, subsurf=2, scale_xyz=(1,1,1)):
    bpy.ops.object.shade_smooth()
    solid = obj.modifiers.new("Solidify", 'SOLIDIFY'); solid.thickness = thickness
    sub = obj.modifiers.new("Subsurf", 'SUBSURF'); sub.levels = subsurf
    obj.scale = scale_xyz

def make_headdress(parent):
    for i in range(HEADDRESS_FEATHERS):
        angle = math.radians(-70 + i*(140/(HEADDRESS_FEATHERS-1)))
        bpy.ops.mesh.primitive_plane_add(size=0.18, location=(1.45, 0, 0.60))
        f = bpy.context.active_object; f.name = f"Feather.{i:02d}"
        bpy.ops.object.modifier_add(type='SUBSURF'); f.modifiers["Subdivision"].levels = 2
        bpy.ops.object.editmode_toggle(); bpy.ops.transform.resize(value=(0.4,2.8,1.0)); bpy.ops.object.editmode_toggle()
        bpy.ops.object.modifier_add(type='SOLIDIFY'); f.modifiers["Solidify"].thickness = 0.01
        f.rotation_euler = (0, angle, 0); f.parent = parent
        col = random.choice(HEADDRESS_COLS)
        f.data.materials.append(_mat_base(f"Headdress{i}", col))

def make_body():
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=0.45, depth=2.6, location=(0.8,0,0.0))
    body = bpy.context.active_object; body.name="SwordfishBody"; bpy.ops.object.shade_smooth()
    sub = body.modifiers.new("Subsurf", 'SUBSURF'); sub.levels = 3; sub.render_levels = 3
    bpy.ops.object.mode_set(mode='EDIT')
    bm = bmesh.from_edit_mesh(body.data)
    for v in bm.verts:
        x = v.co.x
        if x > 1.3: v.co.y *= 0.88; v.co.z *= 0.88
        if 0.8 < x < 1.2: v.co.y *= 1.25; v.co.z *= 1.25
        if x < 0.2: v.co.y *= 0.45; v.co.z *= 0.45
    bmesh.update_edit_mesh(body.data)
    bpy.ops.object.mode_set(mode='OBJECT')

    bpy.ops.mesh.primitive_cone_add(vertices=32, radius1=0.10, radius2=0.005, depth=2.8, location=(2.1,0,0.02))
    nose = bpy.context.active_object; nose.name="Sword"; bpy.ops.object.shade_smooth()
    body.select_set(True); nose.select_set(True); bpy.context.view_layer.objects.active = body; bpy.ops.object.join()

    bpy.ops.mesh.primitive_plane_add(size=0.9, location=(0.0,0,0.02), rotation=(0, math.radians(80), 0))
    tail = bpy.context.active_object; tail.name="TailFin"; _finify(tail, 0.05, 2, (1.5,1.2,1.0)); tail.parent = body

    bpy.ops.mesh.primitive_plane_add(size=0.5, location=(1.1,0,0.7), rotation=(0, math.radians(75), 0))
    dorsal = bpy.context.active_object; dorsal.name="DorsalFin"; _finify(dorsal, 0.04, 2, (0.8,1.5,1.0)); dorsal.parent = body

    bpy.ops.mesh.primitive_plane_add(size=0.35, location=(1.0,0.42,0.0), rotation=(0, math.radians(65), math.radians(20)))
    pL = bpy.context.active_object; pL.name="Pectoral.L"; _finify(pL, 0.03, 2, (1.3,0.8,1.0)); pL.parent = body
    pR = pL.copy(); pR.data = pL.data.copy(); bpy.context.collection.objects.link(pR); pR.name="Pectoral.R"; pR.location.y *= -1; pR.parent=body

    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.11, location=(1.55,0.26,0.22))
    eyeL = bpy.context.active_object; eyeL.name="Eye.L"
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.05, location=(1.60,0.30,0.22))
    pupilL = bpy.context.active_object; pupilL.name="Pupil.L"; pupilL.parent = eyeL; eyeL.parent = body
    eyeR = eyeL.copy(); eyeR.data = eyeL.data.copy(); bpy.context.collection.objects.link(eyeR); eyeR.location.y *= -1
    pupilR = pupilL.copy(); pupilR.data = pupilL.data.copy(); bpy.context.collection.objects.link(pupilR); pupilR.location.y *= -1
    pupilR.parent = eyeR; eyeR.parent = body

    # Materials
    mat_body = _mat_body_gradient("BodyBlue", BODY_BLUE, BELLY_WHITE)
    mat_white = _mat_base("White", BELLY_WHITE)
    mat_black = _mat_base("Black", (0.02,0.02,0.02,1))
    body.data.materials.append(mat_body); tail.data.materials.append(mat_body); dorsal.data.materials.append(mat_body)
    pL.data.materials.append(mat_body); pR.data.materials.append(mat_body)
    eyeL.data.materials.append(mat_white); eyeR.data.materials.append(mat_white); pupilL.data.materials.append(mat_black); pupilR.data.materials.append(mat_black)

    if WITH_SHIRT:
        bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.52, depth=0.45, location=(1.2,0,0.05))
        shirt = bpy.context.active_object; shirt.name="ShirtBand"; bpy.ops.object.shade_smooth()
        solid = shirt.modifiers.new("Solidify", 'SOLIDIFY'); solid.thickness = 0.03
        sub = shirt.modifiers.new("Subsurf", 'SUBSURF'); sub.levels=2
        shirt.parent = body
        shirt.data.materials.append(_mat_base("ShirtWhite", (0.98,0.98,1.0,1)))

    if WITH_HEADDRESS: make_headdress(body)
    return body

def make_rig(body):
    bpy.ops.object.armature_add(enter_editmode=True, location=(0.8,0,0.0))
    arm = bpy.context.active_object; arm.name="Rig"
    eb = arm.data.edit_bones
    root = eb[0]; root.name = "Root"; root.tail = Vector((1.0,0,0))
    spine = eb.new("Spine"); spine.head = Vector((1.0,0,0)); spine.tail=Vector((1.6,0,0)); spine.parent = root
    tail1 = eb.new("Tail.001"); tail1.head = Vector((0.6,0,0)); tail1.tail=Vector((0.2,0,0)); tail1.parent=root
    tail2 = eb.new("Tail.002"); tail2.head = Vector((0.2,0,0)); tail2.tail=Vector((0.0,0,0)); tail2.parent=tail1
    pL = eb.new("Pectoral.L"); pL.head=Vector((1.0,0.15,0)); pL.tail=Vector((1.0,0.45,0)); pL.parent=spine
    pR = eb.new("Pectoral.R"); pR.head=Vector((1.0,-0.15,0)); pR.tail=Vector((1.0,-0.45,0)); pR.parent=spine
    bpy.ops.object.mode_set(mode='OBJECT')
    body.select_set(True); arm.select_set(True); bpy.context.view_layer.objects.active = arm
    bpy.ops.object.parent_set(type='ARMATURE_AUTO')
    return arm

def make_anim(arm):
    bpy.context.scene.frame_start = 1; bpy.context.scene.frame_end = 40
    bpy.context.view_layer.objects.active = arm; bpy.ops.object.mode_set(mode='POSE')
    pb = arm.pose.bones
    def key(name, f, rot): 
        b = pb[name]; b.rotation_mode='XYZ'; b.rotation_euler = Euler(rot); b.keyframe_insert(data_path="rotation_euler", frame=f)
    for f in [1, 20, 40]:
        amp = 0.5 if f==20 else -0.5
        key("Tail.001", f, (0, 0, amp))
        key("Tail.002", f, (0, 0, -amp*1.2))
        key("Pectoral.L", f, (0.2 if f==20 else -0.2, 0, 0.0))
        key("Pectoral.R", f, (-(0.2 if f==20 else -0.2), 0, 0.0))
    bpy.ops.object.mode_set(mode='OBJECT')
    act = arm.animation_data.action; act.name="Swim"

def export_glb(path):
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', export_yup=True, export_apply=True)

# Build
clean_scene()
body = make_body()
rig = make_rig(body) if MAKE_RIG else None
if rig and MAKE_ANIM: make_anim(rig)
export_glb(OUTPUT_PATH)
print("Exported:", OUTPUT_PATH)
