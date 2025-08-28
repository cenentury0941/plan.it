"use client";
import React from "react";
import * as THREE from "three";
import { Text } from "troika-three-text";

export default function ARPage() {
  const startAR = async () => {
    if (!navigator.xr) {
      alert("WebXR not supported on this device/browser.");
      return;
    }

    // Parse URL params
    const params = new URLSearchParams(window.location.search);
    const targetLat = parseFloat(params.get("lat") || "0");
    const targetLon = parseFloat(params.get("lon") || "0");
    const placeText = params.get("text") || "Hello XR";
    const subTextParam = params.get("subtext") || "";

    try {
      const session = await navigator.xr.requestSession("immersive-ar", {
        requiredFeatures: ["local"],
        optionalFeatures: ["local-floor", "viewer"],
      });

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      document.body.appendChild(renderer.domElement);

      // Scene + camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10000
      );

      // --- Text elements ---
      const mainText = new Text();
      mainText.text = placeText;
      mainText.color = 0x000000; // black
      mainText.fontSize = 5;
      mainText.anchorX = "center";
      mainText.anchorY = "bottom";
      mainText.maxWidth = 40;
      mainText.lineHeight = 1.2;
      mainText.overflowWrap = "break-word";

      const subText = new Text();
      subText.text = subTextParam;
      subText.color = 0x555555; // dark gray
      subText.fontSize = 2.5;
      subText.anchorX = "center";
      subText.anchorY = "top";
      subText.maxWidth = 40;
      subText.lineHeight = 1.2;
      subText.overflowWrap = "break-word";
      subText.position.set(0, -6, 0);

      // --- Group for sign ---
      const signGroup = new THREE.Group();
      signGroup.add(mainText);
      signGroup.add(subText);

      // --- Background plane ---
      const bgMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        depthWrite: false, // don’t block text
      });
      const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMaterial);

      // Ensure background always renders first
      bgPlane.renderOrder = 0;
      mainText.renderOrder = 1;
      subText.renderOrder = 1;

      signGroup.add(bgPlane);

      // --- Background resizing ---
      function updateBackground() {
        const mainBox = new THREE.Box3().setFromObject(mainText);
        const subBox = new THREE.Box3().setFromObject(subText);
        const fullBox = mainBox.union(subBox);

        const size = new THREE.Vector3();
        fullBox.getSize(size);
        const center = new THREE.Vector3();
        fullBox.getCenter(center);

        // Update plane
        bgPlane.geometry.dispose();
        bgPlane.geometry = new THREE.PlaneGeometry(size.x + 6, size.y + 6);

        // Align to text center
        bgPlane.position.set(center.x, center.y, -0.1);
      }

      mainText.sync(updateBackground);
      subText.sync(updateBackground);

      // Billboard effect
      function makeBillboard(obj: THREE.Object3D) {
        return () => {
          obj.lookAt(camera.position);
        };
      }
      const updateBillboard = makeBillboard(signGroup);

      scene.add(signGroup);

      // --- GPS placement ---
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const deviceLat = pos.coords.latitude;
          const deviceLon = pos.coords.longitude;

          const R = 6371000; // Earth radius
          const dLat = ((targetLat - deviceLat) * Math.PI) / 180;
          const dLon = ((targetLon - deviceLon) * Math.PI) / 180;

          const x = R * dLon * Math.cos((deviceLat * Math.PI) / 180);
          const z = R * dLat;

          // Raise into the sky
          signGroup.position.set(x, 30, -z);

          // Scale based on distance
          const distance = Math.sqrt(x * x + z * z);
          mainText.fontSize = Math.max(5, distance * 0.05);
          subText.fontSize = Math.max(2.5, distance * 0.02);
        },
        (err) => console.error("Geolocation error:", err)
      );

      // Animate
      const animate = () => {
        updateBillboard();
        renderer.render(scene, camera);
      };
      renderer.setAnimationLoop(animate);
      renderer.xr.setSession(session);
    } catch (err) {
      console.error("Failed to start AR session:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={startAR}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg"
      >
        🚀 Start AR
      </button>
    </div>
  );
}
