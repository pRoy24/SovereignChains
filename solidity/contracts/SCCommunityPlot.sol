// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct ControlledAccess {
    bytes32 r;
    bytes32 s;
    uint8 v;
}

interface CallProxy {
  function anyCall(
    address _to,
    bytes calldata _data,
    address _fallback,
    uint256 _toChainID,
    uint256 _flags
  ) external payable;
  function context() external view returns (address from, uint256 fromChainID, uint256 nonce);
  function executor() external view returns (address executor);
}

contract SCCommunityPlot is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, AccessControl, Ownable {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant COUPON_SIGNER_ROLE = keccak256("COUPON_SIGNER_ROLE");
      
    Counters.Counter private _tokenIdCounter;

    uint private mintChain;
    address private anyCallContractAddress = 0xC10Ef9F491C9B59f936957026020C321651ac078;
    address private contractftm;
    address private contractpolygon;
    address private contractbnb;
    address private receivercontract = 0x3E2347a6F93eaC793C56DC508206e397eA11e83D;

    string private _baseTokenURI;

    mapping(string => address) contract_addresses;

    constructor(
      string memory name,
      string memory symbol,
      string memory baseTokenURI
    ) ERC721(name, symbol) {
      _baseTokenURI = baseTokenURI;
      _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function mintUser(address to, string memory uri, ControlledAccess memory coupon) public virtual {
      bytes32 digest = keccak256(abi.encode(msg.sender));
      require(_isVerifiedAccess(digest, coupon), "Coupon is invalid or expired");
      require(!_isAlreadyMinted(to), "Max 1 mint allowed per user");
      uint256 tokenId = _tokenIdCounter.current();
      _safeMint(to, tokenId);
      _setTokenURI(tokenId, uri);
      incrementGlobalTokenCounter();
    }

    function incrementGlobalTokenCounter() private {
      string memory _msg = 'INCREMENT_TOKEN_ID';
      CallProxy(contract_addresses['bsc']).anyCall(
        contractbnb,
        abi.encode(_msg),
        address(0),
        56,
        2
      );
      CallProxy(contract_addresses['ftm']).anyCall(
        contractftm,
        abi.encode(_msg),
        address(0),
        137,
        2
      );
      CallProxy(contract_addresses['bsc']).anyCall(
        contractftm,
        abi.encode(_msg),
        address(0),
        250,
        2
      );      
    }

    function setContractAddressMapping(string memory chainkey, address contractaddress) public onlyOwner {
      contract_addresses[chainkey] = contractaddress;
    }

    function anyExecute(bytes memory _data) external returns (bool success, bytes memory result){
      string memory _msg = abi.decode(_data, (string));  
      if (keccak256(abi.encodePacked(_msg)) == keccak256(abi.encodePacked('INCREMENT_TOKEN_ID'))) {
        _tokenIdCounter.increment();   
      }
    }

    function _isVerifiedAccess(bytes32 digest, ControlledAccess memory coupon)
      private
      view
      returns (bool)
    {
      address signer = ecrecover(digest, coupon.v, coupon.r, coupon.s);
      require(signer != address(0), 'ECDSA: invalid signature');
      return hasRole(COUPON_SIGNER_ROLE, signer);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
      super._beforeTokenTransfer(from, to, tokenId);
    }


    function _isAlreadyMinted(address to)
      internal returns (bool)
    {
      return false;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
      super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
      public
      view
      override(ERC721, ERC721URIStorage)
      returns (string memory)
    {
      return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
      public
      view
      override(ERC721, ERC721Enumerable, AccessControl)
      returns (bool)
    {
      return super.supportsInterface(interfaceId);
    }
}


