import { OrbitControls, SpotLight } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Controls, useControl } from "react-three-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useRef } from "react";

const Model = function(props) {
    let object = useLoader();
    let ref = useRef();
}

export default Model;